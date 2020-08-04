import React from 'react';

import whastappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/51230543?s=460&u=8fe2613eff1682174f89904c5b5ba9de6e463433&v=4" alt="Henrique Tavares" />
        <div>
          <strong>Henrique Tavares</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avnçada.
        <br /><br />
        Apaixonado por expolir coisas em laboratório e por mudar a vida das pessoas através de experiências.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>

        <button type="button">
          <img src={ whastappIcon } alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;