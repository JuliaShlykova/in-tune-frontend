import React from 'react'

const LikesList = ({toggleShowLikes, likesList}) => {
  return (
    <div className="pop-up-container" onClick={() => {toggleShowLikes()}}>
      <div onClick={(e) => {e.stopPropagation()}}>
        <h2>Users who liked the post</h2>
        <ul>
        {likesList.map((el, i) => {
          return(
            <li key={i}>{el.firstName+' '+el.lastName}</li>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

export default LikesList