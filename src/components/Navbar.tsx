// export default function Navbar() {
//     return (
//         <nav className="navbar">
//             <div className="nav-container">
//                 <a href="/" className="nav-logo">
//                     SkillD
//                 </a>
//                 <ul className="nav-menu">
//                     <li className="nav-item">
//                         <a href="/" className="nav-link">
//                             Home
//                         </a>
//                     </li>
//                     <li className="nav-item">
//                         <a href="/skills" className="nav-link">
//                             Skills
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }

import { Link } from "@tanstack/react-router"
import { LogIn } from "lucide-react"

const Navbar = () => {
  return (
        <nav className="navbar">
            <Link to="/" className="brand">
                <span>SkillD</span>
            </Link>

            <div className="actions">
                <Link to="/signin/$" className="btn-primary">
                  <LogIn size="16" />
                  Sign In
                </Link>
            </div>
        </nav>
    )
}

export default Navbar