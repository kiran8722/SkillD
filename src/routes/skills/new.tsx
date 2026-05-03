import { useState } from 'react'
import type { FormEvent } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { createSkill, createUser } from '@dataconnect/generated'
import { dataConnect } from '#/lib/dataConnect'

export const Route = createFileRoute('/skills/new')({ component: NewSkillPage })

function NewSkillPage() {
  const navigate = useNavigate()
  const [author, setAuthor] = useState({
    clerkId: 'author-1',
    email: 'author@example.com',
    username: 'author1',
    imageUrl: '',
  })

  const [skill, setSkill] = useState({
    title: 'My First Skill',
    description: 'A sample skill created by SQL Connect.',
    tags: 'firebase,data-connect,skill',
    installCommand: 'npm install @skilld/example',
    promptConfig: '{ "temperature": 0.7 }',
    usageExample: 'Use this skill in your app to demo SQL Connect.',
  })

  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus(null)
    setError(null)

    try {
      try {
        await createUser(dataConnect, {
          clerkId: author.clerkId,
          email: author.email,
          username: author.username,
          imageUrl: author.imageUrl || undefined,
        })
      } catch (userError) {
        if (
          userError instanceof Error &&
          /already exists|duplicate|unique|UNIQUE/i.test(userError.message)
        ) {
          // User already exists, continue with skill creation.
        } else {
          throw userError
        }
      }

      await createSkill(dataConnect, {
        authorId: author.clerkId,
        title: skill.title,
        description: skill.description,
        tags: skill.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        installCommand: skill.installCommand,
        promptConfig: skill.promptConfig,
        usageExample: skill.usageExample,
      })

      setStatus('Skill successfully created! Redirecting home...')
      navigate({ to: '/' })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="new-skill-page">
      <div className="page-header">
        <h1>Create a New Skill</h1>
        <Link to="/" className="btn-secondary">Back</Link>
      </div>

      <p>
        This page creates a `User` author record and then creates a `Skill` record using your SQL Connect schema.
        Make sure the Data Connect emulator is running if you are working locally.
      </p>

      <form onSubmit={handleSubmit} className="skill-form">
        <fieldset disabled={loading}>
          <legend>Author</legend>

          <label>
            Clerk ID
            <input
              value={author.clerkId}
              onChange={(event) => setAuthor({ ...author, clerkId: event.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={author.email}
              onChange={(event) => setAuthor({ ...author, email: event.target.value })}
              required
            />
          </label>

          <label>
            Username
            <input
              value={author.username}
              onChange={(event) => setAuthor({ ...author, username: event.target.value })}
            />
          </label>

          <label>
            Image URL
            <input
              value={author.imageUrl}
              onChange={(event) => setAuthor({ ...author, imageUrl: event.target.value })}
            />
          </label>
        </fieldset>

        <fieldset disabled={loading}>
          <legend>Skill</legend>

          <label>
            Title
            <input
              value={skill.title}
              onChange={(event) => setSkill({ ...skill, title: event.target.value })}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={skill.description}
              onChange={(event) => setSkill({ ...skill, description: event.target.value })}
              required
            />
          </label>

          <label>
            Tags (comma-separated)
            <input
              value={skill.tags}
              onChange={(event) => setSkill({ ...skill, tags: event.target.value })}
              required
            />
          </label>

          <label>
            Install Command
            <input
              value={skill.installCommand}
              onChange={(event) => setSkill({ ...skill, installCommand: event.target.value })}
              required
            />
          </label>

          <label>
            Prompt Config
            <textarea
              value={skill.promptConfig}
              onChange={(event) => setSkill({ ...skill, promptConfig: event.target.value })}
              required
            />
          </label>

          <label>
            Usage Example
            <textarea
              value={skill.usageExample}
              onChange={(event) => setSkill({ ...skill, usageExample: event.target.value })}
              required
            />
          </label>
        </fieldset>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Skill'}
        </button>
      </form>

      {status && <p className="success-message">{status}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}
