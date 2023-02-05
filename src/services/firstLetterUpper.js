export function firstLetterUpper(valor)
{
  if (typeof valor !== 'string')
    return valor;

  const regex = /^da$|^de$|^do$|^das$|^dos$/;
  const palavras = valor.toLowerCase().split(' ');
  
  for (var i = 0; i < palavras.length; i++) {
    if (!regex.test(palavras[i])) {
      const primeiraLetra = palavras[i].charAt(0).toUpperCase();
      const restanteDaPalavra = palavras[i].substr(1);
      palavras[i] = `${primeiraLetra}${restanteDaPalavra}`;
    }
  }

  return palavras.join(' ');
}