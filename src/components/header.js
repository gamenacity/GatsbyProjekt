import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from 'gatsby'
import "../styles/stylecomponents/header.scss"

const Header = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata{
                    title
                }
            }
        }
    `)

    const [show, setShow] = useState(false)
    const [men, menShow] = useState(false)

    function updateDisplay() {
        const windowWidth = window.matchMedia('(min-width: 540px)')
        if (windowWidth.matches) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    useEffect(() => {
        updateDisplay();
        window.addEventListener("resize", updateDisplay)
        return () => window.removeEventListener("resize", updateDisplay);
    })


    return (
        <header className="core-header">
            <Link className="core-header__link" to="/">
                <h1 className="core-header__title" id='link'>
                    {data.site.siteMetadata.title}
                </h1>
            </Link>

            <div className="core-header__menu">
                {
                    show && <ul className="menu">
                        <li className="menu__element">
                            <Link to="/blog" className="menu__link">
                                blog
                    </Link>
                        </li>
                        <li className="menu__element">
                            <Link to="/author" className="menu__link">
                                o autorze
                    </Link>
                        </li>
                    </ul>
                }
                {
                    !show && <div className="menu--burger">
                        <i className="fas fa-bars" id='menu' onClick={() => {
                            const menuIcon = document.getElementById('menu')
                            men ? menuIcon.className = 'fas fa-bars' : menuIcon.className = 'fas fa-times'
                            menShow(!men)
                        }
                        }></i>
                        {
                            men && <div className="menu--list">
                                <ul className="menu--vertical">
                                    <li className="menu__element">
                                        <Link to="/blog" className="menu__link">
                                            blog
                                        </Link>
                                    </li>
                                    <li className="menu__element">
                                        <Link to="/404" className="menu__link">
                                            404
                                        </Link>
                                    </li>
                                    <li className="menu__element">
                                        <Link to="/author" className="menu__link">
                                            o autorze
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                }
            </div>
        </header>
    )
}

export default Header