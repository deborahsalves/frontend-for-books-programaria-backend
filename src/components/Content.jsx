import { useState, useEffect } from 'react'
import booksImg from '../assets/books.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [editor, setEditor] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://books-programaria-backend.onrender.com/books'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueTitle(event) {
    setTitle(event.target.value)
  }

  function handleInputValueAuthor(event) {
    setAuthor(event.target.value)
  }

  function handleInputValueCoverUrl(event) {
    setCoverUrl(event.target.value)
  }

  function handleInputValueEditor(event) {
    setEditor(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', title, editor, author, coverUrl)

    async function sendData() {
      await Axios.post(baseURL, {
        title: title,
        editor: editor,
        author: author,
        coverUrl: coverUrl
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setTitle('')
    setAuthor('')
    setCoverUrl('')
    setEditor('')
  }

  return (
    <>
      <Header
        title='Sugestões de livros'
        subtitle='Sugira livros interessantes'
        image={booksImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.coverUrl} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.title}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.author}</p>
                  <q className={styles.cardRepoQuote}>{repo.editor}</q>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueTitle} 
            placeholder="Digite o título"
            value={title}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueCoverUrl} 
            placeholder="Digite o link da imagem"
            value={coverUrl}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueAuthor} 
            placeholder="Digite a autoria"
            value={author}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueEditor} 
            placeholder="Digite a citação"
            value={editor}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar sugestão da livro</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
