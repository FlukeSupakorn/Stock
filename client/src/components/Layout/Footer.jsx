import React from "react";
import { LogoSVG } from "../../assets/images"
export default function Footer() {
  return (
    <div>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <img src={LogoSVG} alt="" className="w-48"/>
          <p>
            GHouse Industries Ltd.
            <br />
            Providing reliable tech since 2077
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Member</h6>
          <div className="grid grid-flow-row gap-4">
            <p>Member 1</p>
            <p>Member 2</p>
            <p>Member 3</p>
          </div>
        </nav>
      </footer>
    </div>
  );
}
