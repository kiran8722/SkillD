import { Show ,UserButton} from "@clerk/tanstack-react-start"
import { Link } from "@tanstack/react-router"
import { LogIn } from "lucide-react"

const Navbar = () => {
  return (
        <nav className="navbar">
            <Link to="/" className="brand">
                <span>SkillD</span>
            </Link>

            <div className="actions">
                <Show when="signed-in">
                    <UserButton />
                </Show>

                <Show when="signed-out">
                   <Link to="/sign-in/$" className="btn-primary">
                  <LogIn size="16" />
                  Sign In
                </Link>
                </Show>
            </div>
        </nav>
    )
}

export default Navbar