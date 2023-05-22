export const getPhrase = () => {
  const frases = [
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'No importa lo lento que vayas, siempre y cuando no te detengas.',
    'El único lugar donde el éxito viene antes que el trabajo es en el diccionario.',
    'No temas a los cambios, teme quedarte igual.',
    'El éxito no es la clave de la felicidad, la felicidad es la clave del éxito.',
    'Cree en ti mismo y todo será posible.',
    'El único límite es el que te pones a ti mismo.',
    'El optimismo es el camino hacia el éxito. Nada puede hacerse sin esperanza y confianza.',
    'Si puedes soñarlo, puedes lograrlo.',
    'No esperes oportunidades, créalas tú mismo.',
    'No importa cuántas veces fracases, solo debes tener éxito una vez.',
    'El éxito es la mejor venganza contra aquellos que dudaron de ti.',
    'No te rindas. Las cosas buenas llevan tiempo.',
    'Tu actitud determina tu dirección.',
    'El primer paso hacia el éxito es creer que es posible.',
    'El fracaso es solo una oportunidad para comenzar de nuevo de manera más inteligente.',
    'La disciplina es el puente entre tus metas y tus logros.',
    'El éxito no es para los que nunca fallan, sino para los que nunca se rinden.',
    'No dejes que tus sueños sean solo sueños. Persíguelos.',
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'Si puedes soñarlo, puedes lograrlo. Si puedes imaginarlo, puedes construirlo.'
  ]

  const indice = Math.floor(Math.random() * frases.length)
  return frases[indice]
}
