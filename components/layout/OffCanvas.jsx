import Link from "next/link";

export default function OffCanvas({ isOffCanvas, handleOffCanvas }) {
  return (
    <>
      {/* offCanvas-menu */}
      <div className={`offCanvas__info ${isOffCanvas ? "active" : ""}`}>
        <div
          className="offCanvas__close-icon menu-close"
          onClick={handleOffCanvas}
        >
          <button>
            <i className="ri-close-line" />
          </button>
        </div>
        <div className="offCanvas__logo mb-5">
          <h3 className="mb-0">Get in touch</h3>
        </div>
        <div className="offCanvas__side-info mb-30">
          <div className="contact-list mb-30">
            <p className="fs-6 fw-medium text-200 mb-5">
              We're always excited to take on new projects and collaborate with
              innovative minds.
            </p>
            <div className="mb-3">
              <span className="text-400 fs-5">Phone Number</span>
              <p className="mb-0">+91-989-898-9898</p>
            </div>
            <div className="mb-3">
              <span className="text-400 fs-5">Email</span>
              <p className="mb-0">contact@mbit.devs</p>
            </div>
            <div className="mb-3">
              <span className="text-400 fs-5">Skype</span>
              <p className="mb-0">Mbitdevs</p>
            </div>
            <div className="mb-3">
              <span className="text-400 fs-5">Address</span>
              <p className="mb-0">
                2nd Floor, Omega Complex, Sector 62, Noida - 201309, Uttar
                Pradesh, India
              </p>
            </div>
          </div>
          <div className="contact-list">
            <p className="text-400 fs-5 mb-2">Social</p>
            <div className="d-md-flex d-none gap-3">
              <Link href="/http://facebook.com">
                <i className="ri-facebook-circle-fill fs-18" />
              </Link>
              <Link href="/http://twitter.com">
                <i className="ri-twitter-x-fill fs-18" />
              </Link>
              <Link href="/http://linkedin.com">
                <i className="ri-linkedin-fill fs-18" />
              </Link>
              <Link href="/http://github.com">
                <i className="ri-github-fill fs-18" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`offCanvas__overly ${isOffCanvas ? "active" : ""}`}
        onClick={handleOffCanvas}
      />
    </>
  );
}
