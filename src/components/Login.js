import { Link } from "react-router-dom"
import React from 'react'

const Login = () => {
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
                <div className="column is-4-desktop">
                    <form action="" className="box">
                        <div className="field mt-5">
                            <label className="label">Email or Username</label>
                            <div className="controls">
                                <input type="text" className="input" name="" id="" placeholder="Username" />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Password</label>
                            <div className="controls">
                                <input type="text" className="input" name="" id="" placeholder="*********" />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-primary is-fullwidth">
                                Login
                            </button>
                        </div>
                        <div className="field mt-2">
                            <button className="button is-primary is-fullwidth">
                              <Link to="/register">Register</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Login
