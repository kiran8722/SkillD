import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from "@clerk/tanstack-react-start";

export const Route = createFileRoute('/__auth/sign-in/$')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
		<section id="sign-in">
			<SignIn
				routing="path"
				path="/sign-in"
				signUpUrl="/sign-up"
				fallbackRedirectUrl="/"
			/>
		</section>
	);
}
