import SkillCard from '../components/SkillCard'
import { dummySkills } from '../data/skills'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })


function Home() {
  return (
    <div id="home">
      <section className='hero'>
        <div className='copy'>
          <h1>
            The Registry for <br/>
            <span className='text-gradient'>
                Agentic Intelligence 
            </span>
          </h1>
          <p>
            A high quality registry of ready skills for Agentic Intelligence, built with React and TypeScript.
          </p>
        </div>
        <div className='actions'>
          <Link to="/skills" className='btn-primary'>
            <Terminal size={18}/>
            <span>Browse Registry</span>
          </Link>
          <Link to="/skills/new" className='btn-secondary'>
            Publish Skill
          </Link>
        </div>
      </section>

      <section className='latest'>
        <div className='space-y-2'>
          <h2>Recently Created
            <span className='text-gradient'>
              Skills
            </span>
          </h2>
          <p>
            {""}
            Latest Skills loaded from the database in descending creation order.
          </p>
        </div>

        <div>
          <div>
            {dummySkills.length > 0 ? (
              <div className="skills-grid">
                {[...dummySkills]
                  .sort((a, b) => {
                    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0
                    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0
                    return bTime - aTime
                  })
                  .map((skill) => (
                    <SkillCard key={skill.id} {...skill}>
                    </SkillCard>
                  ))}
              </div>
            ) : (
              <p> No skills created yet. </p>
            )}
          </div>
        </div>

      </section>
    </div>
  )
}
