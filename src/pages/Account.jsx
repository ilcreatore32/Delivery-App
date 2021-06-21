import React from 'react'

function Account() {
    return (
        <div>
            <h2 className='tab-title'>Mi Cuenta</h2>

            <div className="user-info">
                <div className="user-name">
                    <h3>Mi usuario: </h3>
                    <input type="text" readOnly/>
                </div>
                <h4 className="tab-title">Mis Servicios y Productos</h4>
                <ul>

                </ul>
            </div>
        </div>
    )
}

export default Account
