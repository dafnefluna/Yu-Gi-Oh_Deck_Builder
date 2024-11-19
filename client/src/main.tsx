import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import LandingPage from './pages/LandingPage'
import UserPage from './pages/UserPage'
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
                path: '/UserPage',
                element: <UserPage />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
   <RouterProvider router = {router} />
)