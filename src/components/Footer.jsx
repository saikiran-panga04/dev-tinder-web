const Footer = () => {
  return (
    <footer className="border-t border-base-300/60 bg-base-100/70 px-4 py-4 text-base-content/60 backdrop-blur-md">
      <div className="app-container flex flex-col items-center justify-between gap-2 text-xs sm:flex-row sm:text-sm">
        <span className="font-bold text-base-content">
          <span className="text-primary">Dev</span>Tinder
        </span>
        <p>Copyright © {new Date().getFullYear()} DevTinder. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer