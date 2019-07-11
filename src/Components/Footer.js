import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import logo from'../images/logo.png';
import '../Styles.css';


export class Footer extends Component {
    render() {
        return (
            <footer className="shp-footer">
                <div className="shp-footer_top">
                    <div className="shp-row shp-footer_row">
                        <div className="shp-col-md-4">
                            <div className="shp-footer_line"></div>
                        </div>
                        <div className="shp-col-md-4">
                            <div className="shp-logo shp-logo--footer">
                                <NavLink className="shp-logo_link" to="/"><img className="shp-logo_img" src={logo} alt="Handsome Classic"/></NavLink>
                            </div>
                        </div>
                        <div className="shp-col-md-4">
                            <div className="shp-footer_line"></div>
                        </div>

                    </div>
                    <div className="shp-row shp-footer_row">
                        <div className="shp-col-md-4">
                            <div className="shp-footer_column">
                                <p className="shp-footer_column-info">“Wherever you find yourself on the [journey towards sustainable and ethical living], start there and evolve from that point on.”</p>
                            </div>
                        </div>
                        <div className="shp-col-md-4">
                            <ul className="list-reset shp-footer_nav">
                                <li className="shp-footer_nav-item">
                                    <NavLink className="shp-nav_link shp-footer_nav-link" to="/suits">Suits</NavLink>
                                </li>
                                <li className="shp-footer_nav-item">
                                    <NavLink className="shp-nav_link shp-footer_nav-link" to="/accessories">Accessories</NavLink>
                                </li>
                                <li className="shp-footer_nav-item">
                                    <NavLink className="shp-nav_link shp-footer_nav-link" to="/shoes">Shoes</NavLink>
                                </li>

                            </ul>
                        </div>
                        <div className="shp-col-md-4">
                            <div className="shp-footer_column">
                                <p className="shp-footer_column-info">“The sustainable and ethical fashion industry is thriving. Whatever garment or accessory category you are in the market for, there’s a brand for that.”</p>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="shp-footer_bottom">
                   <p className="copyright-info"> &copy;vahenunegev 2019</p>
                </div>
            </footer>
        )
    }


}

export default Footer;
