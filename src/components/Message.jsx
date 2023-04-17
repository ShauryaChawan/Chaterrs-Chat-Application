import React from 'react'

const Message = () => {
	return (
		<div className='message'>
			<div className="messageInfo">
				<img src="https://images.pexels.com/photos/15565598/pexels-photo-15565598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
				<span>Just Now</span>
			</div>
			<div className="messageContent">
				<p>Hello</p>
				<img src="https://images.pexels.com/photos/15565598/pexels-photo-15565598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
			</div>
		</div>
	)
}

export default Message