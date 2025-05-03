import { X, Bold, Italic, Code, List, ListOrdered, LinkIcon, Undo, Redo } from 'lucide-react'
import { Task } from '../types/task.types'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import LinkExtension from '@tiptap/extension-link'
import { useState, useEffect } from 'react'
import '../styles/editor.css'

interface TaskEditorProps {
  openTasks: Task[]
  selectedTask: Task
  onTaskSelect: (task: Task) => void
  onTaskClose: (taskId: string, e: React.MouseEvent) => void
  onTaskUpdate?: (task: Task) => void
}

type ActivityItem = NonNullable<Task['activity']>[number]

export function TaskEditor({
  openTasks,
  selectedTask,
  onTaskSelect,
  onTaskClose,
  onTaskUpdate
}: TaskEditorProps) {
  const [editedDescription, setEditedDescription] = useState(selectedTask.description)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a description...',
        showOnlyWhenEditable: true,
        emptyEditorClass: 'is-editor-empty',
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
    ],
    content: editedDescription,
    editorProps: {
      attributes: {
        class: 'editor-content-area',
        spellcheck: 'false',
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const { state } = view
            const { selection } = state
            const { empty } = selection
            
            if (!empty) {
              // Force selection update to match visual boundaries
              view.dispatch(state.tr.setSelection(selection))
              return true
            }
          }
          return false
        },
        mouseup: (view) => {
          const { state } = view
          const { selection } = state
          if (!selection.empty) {
            // Ensure selection matches visual text boundaries
            view.dispatch(state.tr.setSelection(selection))
          }
          return false
        },
      },
    },
    onFocus: ({ editor }) => {
      if (!editor.isActive('paragraph')) {
        editor.commands.setParagraph()
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      // Ensure text boundaries are preserved
      // const cleanHtml = html.replace(/(<\/p>)(?!\n)/g, '</p>\n')
      setEditedDescription(html)
      onTaskUpdate?.({
        ...selectedTask,
        description: html
      })
    },
  })

  useEffect(() => {
    if (editor && selectedTask.description !== editor.getHTML()) {
      editor.commands.setContent(selectedTask.description)
    }
  }, [selectedTask.description, editor])

  const addLink = () => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-primary">
      {/* Tab bar */}
      <div className="flex items-center bg-secondary border-b border-default">
        {openTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center px-4 py-2 border-r border-default cursor-pointer ${
              selectedTask.id === task.id ? 'bg-primary' : 'bg-secondary'
            } hover:bg-secondary`}
            onClick={() => onTaskSelect(task)}
          >
            <span className="text-sm font-medium text-primary">{task.id}</span>
            <X
              size={16}
              className="ml-2 cursor-pointer text-primary hover:text-accent"
              onClick={(e) => onTaskClose(task.id, e)}
            />
          </div>
        ))}
        <div className="flex-grow" />
      </div>

      {/* Task content */}
      <div className="flex-grow overflow-y-auto text-primary">
        {selectedTask && (
          <div className="h-full flex flex-col">
            {/* Description Section */}
            <div className="flex-grow">
              <div className="p-4 bg-secondary border-b border-default">
                <h2 className="text-sm font-medium text-primary mb-2">Description</h2>
              </div>
              <div className="editor-wrapper">
                <div className="editor-toolbar">
                  <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`toolbar-button ${editor?.isActive('bold') ? 'active' : ''}`}
                    title="Bold"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`toolbar-button ${editor?.isActive('italic') ? 'active' : ''}`}
                    title="Italic"
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className={`toolbar-button ${editor?.isActive('code') ? 'active' : ''}`}
                    title="Code"
                  >
                    <Code size={16} />
                  </button>
                  <div className="toolbar-divider" />
                  <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`toolbar-button ${editor?.isActive('bulletList') ? 'active' : ''}`}
                    title="Bullet List"
                  >
                    <List size={16} />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`toolbar-button ${editor?.isActive('orderedList') ? 'active' : ''}`}
                    title="Numbered List"
                  >
                    <ListOrdered size={16} />
                  </button>
                  <button
                    onClick={addLink}
                    className={`toolbar-button ${editor?.isActive('link') ? 'active' : ''}`}
                    title="Add Link"
                  >
                    <LinkIcon size={16} />
                  </button>
                  <div className="toolbar-divider" />
                  <button
                    onClick={() => editor?.chain().focus().undo().run()}
                    className="toolbar-button"
                    title="Undo"
                    disabled={!editor?.can().undo()}
                  >
                    <Undo size={16} />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().redo().run()}
                    className="toolbar-button"
                    title="Redo"
                    disabled={!editor?.can().redo()}
                  >
                    <Redo size={16} />
                  </button>
                </div>
                <div className="relative">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            {/* Acceptance Criteria Section */}
            {selectedTask.acceptanceCriteria && selectedTask.acceptanceCriteria.length > 0 && (
              <div className="border-t border-default bg-secondary">
                <div className="p-4 text-primary">
                  <h2 className="text-sm font-medium text-primary mb-2">Acceptance Criteria</h2>
                  <ul className="list-disc text-sm space-y-2 ml-4 text-primary">
                    {selectedTask.acceptanceCriteria.map((criteria: string, index: number) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={criteria}
                          onChange={(e) => {
                            const newCriteria = [...selectedTask.acceptanceCriteria!]
                            newCriteria[index] = e.target.value
                            onTaskUpdate?.({ ...selectedTask, acceptanceCriteria: newCriteria })
                          }}
                          className="bg-transparent w-full focus:outline-none focus:border-b border-accent text-primary"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Activity Section */}
            <div className="border-t border-default bg-secondary">
              <div className="p-4 text-primary">
                <h2 className="text-sm font-medium text-primary mb-4">Activity</h2>
                
                {/* Activity Feed */}
                <div className="space-y-4">
                  {selectedTask.activity?.map((activity: ActivityItem) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {activity.user.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-baseline">
                          <span className="font-medium text-sm text-primary">{activity.user}</span>
                          <span className="ml-2 text-xs text-secondary">
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-primary">{activity.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    className="flex-grow bg-secondary text-primary rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
                    placeholder="Add a comment..."
                  />
                  <button className="px-4 py-2 bg-accent text-primary text-sm font-medium rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 