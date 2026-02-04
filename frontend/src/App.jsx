import React, {useState} from "react"; // Se importa useState para mejorar el estado
import './App.css';

function App() {
  const [inputText, setInputText] = useState(''); // Estado para el texto de entrada
  const [translatedText, setTranslatedText] = useState(''); // Estado para el texto traducido
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar si se esta cargando
  const [error, setError] = useState(null);

  // Funcion que se llamara al hacer click en el boton traducir
  const handleTranslate = async () => {
    setError(null); // Limpia los errores anteriores
    setIsLoading(true); // Indica que la traduccion esta en progreso
    setTranslatedText(''); // Limpiar traduccion anterior

    try {
      // llamada a la api de back
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          text: inputText,
          fromLang: 'es', // Hardcodeamos el idioma origen a español por ahora
          toLang: 'en', // lo mimso que arriba pero destino ingles
        }),
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.error || 'Algo salio mal en el servidor');
      }

      const data = await response.json
      setTranslatedText(data.translatedText); // Actualizar el estado con el texto traducido
    } catch (error) {
      console.error('Error al traducir:', err);
      setError('Error al traducir: ' + err.message); // mostrar el error al usuario
    }
  };


return (
  <div className="App">
    <h1>Traductor de Texto</h1>

    <div className="Translator-cotainer">
      <textarea
        placeholder="Escribe el texto en español aqui..."
        rows="10"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <button onClick={handleTranslate} disabled={isLoading || !inputText.trim()}>
        {isLoading ? 'Traducionedo...' : 'Traducir a Ingles'}
      </button>

      {error & <p className="error-message" style={{color: 'red'}}></p>}

      {translatedText && (
        <div className="translated_output">
          <h2>Texto traducido:</h2>
          <p>{translatedText}</p> 
        </div>
      )}
    </div>
  </div>
);
};

export default App;