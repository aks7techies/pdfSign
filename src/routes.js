import React from 'react'

const Dashboard = React.lazy(() => import('./components/dashboard/Home'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
// const RequestAssignHead = React.lazy(() => import('./views/theme/requestAssignHead/RequestAssign'))
// const RequestAssignMember = React.lazy(() => import('./views/theme/requestAssignMember/RequestAssignMember'))


// Login

// const LogIn = React.lazy(()=> import('./views/Login/login'))







const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/Login',  name: 'Login',element: LogIn },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/theme', name: 'Booking', element: Colors, exact: true },
  // { path: '/theme/new_booking', name: 'New Booking', element: Colors },
  // { path: '/theme/booking', name: 'Total Booking', element: Typography },
  // { path: '/theme/Reuest_Assign', name: 'Request Assign to Head', element: RequestAssignHead  },
  // { path: '/theme/Request_AssignMember', name: 'Request Assign to Member', element: RequestAssignMember },
  // { path: '/equiry', name: 'Enquiry', element: Enquiry, exact: true },
  // { path: '/equiry/all', name: 'All', element: Enquiry },
  // { path: '/equiry/NewEnquiry', name: 'Add New Enquiry', element: AddNewEnquiry },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
 
  
]

export default routes
