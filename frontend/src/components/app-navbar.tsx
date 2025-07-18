import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {

  return (
    <>
      <div className="w-full flex items-center p-4  h-16 sticky top-0 justify-end ">
        <ModeToggle/>
      </div>
    </>
  )

}