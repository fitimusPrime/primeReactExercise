import { PAGES } from 'Constants'

const routes = [
  {
    display: 'Home',
    id: PAGES.HOME,
  },
  {
    display: '1. Setup and Introduction',
    id: PAGES.LECTURE_1.ID,
    children: [
      {
        display: 'Getting Started',
        id: PAGES.LECTURE_1.GETTING_STARTED,
        children: [
          {
            display: 'GitLab',
          },
          {
            display: 'Source Tree'
          },
          {
            display: 'VS Code'
          },
          {
            display: 'Slack'
          },
          {
            display: 'MongoDB'
          },
          {
            display: 'NPM'
          },
        ]
      },
      {
        display: 'Project Setup',
        id: PAGES.LECTURE_1.PROJECT_SETTUP,
        children: [
          {
            display: 'Seting up the repository'
          },
          {
            display: 'Running the Application'
          }
        ]
      },
      {
        display: 'Agile Methodology',
        id: PAGES.LECTURE_1.AGILE_METHODOLOGY,
        children: [
          {
            display: 'Scrum'
          }
        ]
      },
      {
        display: 'Working with GIT (Source Tree or Terminal)',
        id: PAGES.LECTURE_1.WORKING_WITH_GIT,
        children: [
          {
            display: 'Workflow'
          },
          {
            display: 'Add & Commit'
          },
          {
            display: 'Pushing Changes'
          },
          {
            display: 'Branching'
          },
          {
            display: 'Update and Merge'
          }
        ]
      },
      {
        display: 'Way of Working',
        id: PAGES.LECTURE_1.WAY_OF_WORKING,
        children: [
          {
            display: 'GitLab Setup',
          },
          {
            display: 'Rules',
          },
          {
            id: 'way_of_working_exercise_1',
            display: 'Exercise 1'
          }
        ]
      }
    ]
  },
  {
    display: 'Playground',
    id: PAGES.PLAYGROUND,
  }
]

const format = (which) => {
  let children = which.children || []
  return {
    ...which,
    id: !which.id ? which.display.replace(/ /g, '').replace(/[^a-zA-Z]/g, '').toLowerCase() : which.id,
    children: children.map(format)
  }
}

export const findById = (id) => {
  return routes.reduce((flatten, next) => {
    let children = next.children || []
    return [...flatten, next, ...children]
  }, []).find(which => which.id === id)
}

/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
export default routes.map(format)


