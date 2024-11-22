import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import LandingPage from './pages/LandingPage'
import UserPage from './pages/UserPage'
// import SettingsPage from './pages/SettingsPage'
import CardCollectionPage from './pages/CardCollectionPage'
import DeckPage from './pages/DeckPage'
// import DeckCreatorPage from './pages/DeckCreatorPage'
import SearchPage from './pages/SearchPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1 className='display-2'>Wrong page!</h1>,
        children: [
            {
                index: true,
                element: <LandingPage />
            }, {
                path: '/Profile',
                element: <UserPage />
            },
            {
                path: '/MyCollection',
                element: <CardCollectionPage />
            },
            {
                path: '/MyDecks',
                element: <DeckPage />
            },
            {
                path: '/Search',
                element: <SearchPage />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)