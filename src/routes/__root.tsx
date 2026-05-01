import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect, useState, type ReactNode } from 'react'

import ClerkProvider from '../integrations/clerk/provider'
import TanstackQueryProvider from '../integrations/tanstack-query/root-provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import  '../styles.css'

import type { QueryClient } from '@tanstack/react-query'
import Navbar from '#/components/Navbar'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'SkillD - A Ready skill for Agentic Intelligence',
      },
      {
        name: 'description',
        content: 'A ready skill for Agentic Intelligence',
      }
    ],
    links: [],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider>
          <div id="root-layout">
            <header>
              <div className='frame'>
                    <Navbar />
              </div>
            </header>
          </div>

          <main>
            <div className='frame'>
                 {children}
            </div>
          </main>
          <TanstackQueryProvider> 
            
         
            {isClient && (
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: () => <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          )}
          </TanstackQueryProvider>
        </ClerkProvider>
        <Scripts />
      </body>
    </html>
  )
}
