import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'

const FooterComponent = (props) => {

    useEffect(() => {
        // back-to-top
        // slideDown Or slideUp
        $(document).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $(".back-to-top").slideDown('slow');
            } else {
                $(".back-to-top").slideUp('slow');
            }
        });
    }, []);

    // handleBackToTop
    function handleBackToTop(e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 600);
    }

    return (
        <React.Fragment>
            <footer id="footer">
                <div className="container">
                    <div className="footer_logo text-center">
                        <Link to="/"><img src="/dist/img/logo.png" alt="" className="img-fluid"/></Link>
                    </div>
                    <div className="copy_right text-center">
                        <p>©{new Date().getFullYear()}. All Rights Reserved. Developed by Hasan Uj Jaman :)
                        </p>
                    </div>
                </div>
            </footer>
            <a href="/#" rel="noreferrer noopener" className="back-to-top" onClick={(e) => {
                handleBackToTop(e);
            }}>
                <i className="fa fa-angle-up"/>
            </a>
        </React.Fragment>
    )
};

export default FooterComponent;