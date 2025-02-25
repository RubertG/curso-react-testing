import { useState } from "react"

const Contador = () => {
  const [cont, setCont] = useState(0)

  const incrementar = () => {
    setCont(cont + 1)
  }

  const decrementar = () => {
    setCont(cont - 1)
  }

  return (
    <div>
      <button onClick={decrementar}>Decrementar</button>
      <p>Contador: {cont}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  )
}

export{ Contador}
