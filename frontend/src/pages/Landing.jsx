import React from "react";
var backgroundImage = require("/Users/unnati/Documents/SOEN_6441/Spoonacular/frontend/src/pages/background.png");


const Landing = () => {
    return (
        <div data-testid="landing-1" className="landing">
            <div>
                <ul>
                    <li><a class="active" href="http://localhost:3001/">Home</a></li>
                    <li><a href="http://localhost:3001/Login">Login</a></li>
                    <li><a href="http://localhost:3001/SignUp">SignUp</a></li>
                </ul>
            </div>

            <div class="landingpage">
                <img alt="background" id="backgroundImage" src={backgroundImage} />
            </div>
        </div>

    )
}
export default Landing