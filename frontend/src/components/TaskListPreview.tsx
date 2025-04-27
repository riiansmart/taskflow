import React from 'react'

export function TaskListPreview() {
  return (
    <div className="task-list">
      <div className="task-list-header">
        <div className="task-list-header-item task-header-checkbox">
          <input type="checkbox" className="task-checkbox" disabled />
        </div>
        <div className="task-list-header-item task-header-id sortable">#</div>
        <div className="task-list-header-item sortable">Title</div>
        <div className="task-list-header-item task-header-type sortable">Type</div>
        <div className="task-list-header-item sortable">Status</div>
        <div className="task-list-header-item sortable">Priority</div>
        <div className="task-list-header-item task-header-date sortable">Due Date</div>
        <div className="task-list-header-item task-header-actions">Actions</div>
      </div>
      <div className="task-list-body">
        {/* Example Task 1 */}
        <div className="task-item">
          <div className="task-cell task-cell-checkbox">
            <input type="checkbox" className="task-checkbox" />
          </div>
          <div className="task-cell task-cell-id"><span className="task-id">TASK-7879</span></div>
          <div className="task-cell"><div className="task-title" title="Try to calculate the EXE feed, maybe it will index the multi-byte pixel!">Try to calculate the EXE feed...</div></div>
          <div className="task-cell task-cell-type"><span className="task-type"><i className="fas fa-file-alt"></i> Documentation</span></div>
          <div className="task-cell"><span className="status-pill status-backlog"><i className="fas fa-pause"></i> Backlog</span></div>
          <div className="task-cell"><span className="priority-indicator priority-medium"><span className="priority-dot dot-medium"></span> Medium</span></div>
          <div className="task-cell task-cell-date"><span className="task-due">May 10, 2025</span></div>
          <div className="task-cell task-cell-actions"><div className="action-buttons"><button className="action-button"><i className="fas fa-edit"></i></button><button className="action-button"><i className="fas fa-trash"></i></button></div></div>
        </div>
        {/* Example Task 2 */}
        <div className="task-item">
          <div className="task-cell task-cell-checkbox">
            <input type="checkbox" className="task-checkbox" />
          </div>
          <div className="task-cell task-cell-id"><span className="task-id">TASK-7839</span></div>
          <div className="task-cell"><div className="task-title" title="We need to bypass the neural TCP card!">We need to bypass the neural TCP card!</div></div>
          <div className="task-cell task-cell-type"><span className="task-type"><i className="fas fa-bug"></i> Bug</span></div>
          <div className="task-cell"><span className="status-pill status-todo"><i className="fas fa-circle-notch"></i> Todo</span></div>
          <div className="task-cell"><span className="priority-indicator priority-high"><span className="priority-dot dot-high"></span> High</span></div>
          <div className="task-cell task-cell-date"><span className="task-due overdue">Apr 28, 2025</span></div>
          <div className="task-cell task-cell-actions"><div className="action-buttons"><button className="action-button"><i className="fas fa-edit"></i></button><button className="action-button"><i className="fas fa-trash"></i></button></div></div>
        </div>
      </div>
    </div>
  )
} 