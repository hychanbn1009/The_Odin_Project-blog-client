import React from "react";

const Footer =()=>{
    return(
        <footer className='footer bg-dark text-white'>
            <div className='container'>
                <div className='d-flex flex-row'>
                    <div className='col'>
                        <span>Copyright © 2021</span>
                        <a href='https://github.com/hychanbn1009' className='ms-auto'>
                        <span className="iconify" data-width="24" data-height="24" data-icon="akar-icons:github-fill"></span>
                        <span>hychanbn1009</span>  
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer