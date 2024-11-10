import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import '../styles/Profile.css'
import { useTheme } from '../contexts/ThemeContext';

function Profile() {
  const [files, setFiles] = useState<File[]>([]); // Estado para armazenar os arquivos selecionados
  const [error, setError] = useState<string>(''); // Estado para erros
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Estado para o progresso do upload
  const { isDarkMode } = useTheme();


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    // Limite de arquivos
    if (selectedFiles && selectedFiles.length > 10) {
      setError('Você pode selecionar no máximo 10 arquivos');
    } else {
      setError('');
      setFiles(Array.from(selectedFiles || []));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Adicionando os arquivos ao FormData
    files.forEach((file) => {
      formData.append('file', file); // 'files' é o nome do campo que o backend espera
    });

    try {
      // Enviando os arquivos para o backend com monitoramento de progresso
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Importante para enviar arquivos
            'uploadType': 'profilePic'
          },
          withCredentials: true, // Caso precise enviar cookies ou autenticação
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent); // Atualizando o progresso
            }
          },
        }
      );

      console.log('Arquivos enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os arquivos:', error);
      setError('Erro ao enviar os arquivos');
    }
  };

  return (
    <div className="profile__wrapper" data-theme={isDarkMode ? 'dark' : 'light'}>
      sadfsafd
    </div>
  )
}

export default Profile;
