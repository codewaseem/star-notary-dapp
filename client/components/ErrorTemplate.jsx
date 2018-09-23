import React from "react";
import NoWeb3Icon from "./NoWeb3Icon";
const stylesheet = `
.Web3Provider-container {
  font-family: Helvetica, Arial;
  color: hsl(0,0%,50%);
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background: hsl(0, 0%, 95%);
  background: -webkit-linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 95%));
  background: -moz-linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 95%));
  background: -o-linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 95%));
  background: linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 95%));
}
.Web3Provider-wrapper {
  width: 400px;
  border: 1px solid hsl(207, 90%, 54%);
  border-radius: 20px;
  text-align: center;
  padding: 50px 40px;
  margin: 80px auto;
}
.Web3Provider-image {
  max-height: 175px;
}
.Web3Provider-title {
  margin-top: 50px;
  color: hsl(0,0%,25%);
}
.Web3Provider-message {
  line-height: 27px;
  font-size: 18px;
  color: hsl(0,0%,50%);
}
`;

function ErrorTemplate(props) {
    return (
        <div className="Web3Provider-container">
            <style dangerouslySetInnerHTML={{ __html: stylesheet }}
            />
            <div className="Web3Provider-wrapper">
                <div className="Web3Provider-image">
                    <NoWeb3Icon />
                </div>
                <h1
                    className="Web3Provider-title"
                    dangerouslySetInnerHTML={{ __html: props.title }}
                />
                <p
                    className="Web3Provider-message"
                    dangerouslySetInnerHTML={{ __html: props.message }}
                />
            </div>
        </div>
    )
}

export default ErrorTemplate;