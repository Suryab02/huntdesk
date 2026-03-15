import { useState, useEffect } from 'react'
import { getJobs, updateJobStatus, deleteJob } from '../services/api'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'

const COLUMNS = [
  { id: 'wishlist',  label: 'Wishlist',   color: '#64748b', bg: '#f1f5f9' },
  { id: 'applied',   label: 'Applied',    color: '#2563eb', bg: '#eff6ff' },
  { id: 'screening', label: 'Screening',  color: '#d97706', bg: '#fffbeb' },
  { id: 'interview', label: 'Interview',  color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'offer',     label: 'Offer',      color: '#16a34a', bg: '#f0fdf4' },
  { id: 'rejected',  label: 'Rejected',   color: '#dc2626', bg: '#fef2f2' },
]

function Kanban() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchJobs() }, [])

  const fetchJobs = async () => {
    try {
      const res = await getJobs()
      setJobs(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getJobsByStatus = (status) => jobs.filter(j => j.status === status)

  const handleDragEnd = async (result) => {
    if (!result.destination) return
    const jobId = parseInt(result.draggableId)
    const newStatus = result.destination.droppableId
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j))
    try {
      await updateJobStatus(jobId, newStatus)
    } catch {
      fetchJobs()
    }
  }

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId)
      setJobs(prev => prev.filter(j => j.id !== jobId))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ padding: '32px 24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>
            Kanban Board
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '2px' }}>
            Drag and drop to update application status
          </p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '16px' }}>
            {COLUMNS.map(col => (
              <div key={col.id} style={{ flexShrink: 0, width: '240px' }}>

                {/* Column header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '10px', padding: '8px 12px', borderRadius: '8px',
                  background: col.bg
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: col.color }}>
                    {col.label}
                  </span>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, background: 'white',
                    color: col.color, padding: '2px 7px', borderRadius: '20px'
                  }}>
                    {getJobsByStatus(col.id).length}
                  </span>
                </div>

                {/* Droppable column */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        minHeight: '120px',
                        borderRadius: '10px',
                        padding: '4px',
                        background: snapshot.isDraggingOver ? col.bg : 'transparent',
                        transition: 'background 0.15s'
                      }}
                    >
                      {getJobsByStatus(col.id).map((job, index) => (
                        <Draggable
                          key={job.id}
                          draggableId={String(job.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <JobCard
                                job={job}
                                onDelete={handleDelete}
                                dragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Kanban