import React from 'react'

type Props = { message: string };

export const MessageField: React.FC<Props> = ({ message = 'Silence is golden.' }) => {
  return (
    <p>
      {message}
    </p>
  )
}