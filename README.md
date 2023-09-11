<div align="center">
  <h1>Vambora</h1>

  <img src="https://user-images.githubusercontent.com/82476801/206912846-60274c1a-0835-4ff7-b3b3-87a722c1e711.png" />

  <h2>🚙 Aplicação que busca ajudar alunos da UnB a oferecer e pegar carona entre si 🚙</h2>

  <p> 
    🚧 Em construção...  🚧
  </p>
</div>

# Tabela de conteúdos

<p align="center">
 <a href="#sobre">Sobre</a> • 
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#contribuicao">Contribuição</a> • 
 <a href="#run">Como Rodar</a> • 
 <a href="#autores">Autores</a>
</p>

<section id="sobre">
  <h1> Sobre </h1>
  <p>
    O Vambora é uma aplicação desenvolvida na disciplina de Métodos de Desenvolvimento de Software, da Universidade de Brasília, ministrada pela professora Carla. O intuito dela é facilitar caronas entre alunos, que muitas vezes demoram horas no ônibus para chegar na faculdade, por não saber que tem alguém por perto que poderia estar dando carona e dividindo os custos.
  </p>
</section>

<section id="tecnologias">
  <h1> Tecnologias </h1>
  <p>Geral:</p>
  <ul>
    <li>TypeScript</li>
  </ul>
  <p>Frontend:</p>
  <ul>
    <li>React Native</li>
    <li>Expo</li>
    <li>Styled Components</li>
  </ul>
  <p>Backend:</p>
  <ul>
    <li>Node</li>
    <li>Docker</li>
    <li>TSyringe</li>
    <li>Nodemailer</li>
    <li>Vitest</li>
    <li>Express</li>
  </ul>
</section>

<section id="contribuicao">
  <h1> Contribuição </h1>
  
  <p> Para contribuir, basta abrir uma issue ou pegar uma já existente, criar uma nova branch, resolver o problema e fazer um pull request! </p>
</section>

<section id="run">
  <h1> Como Rodar </h1>
  
  <p>Pré-requisitos:</p>
  <ul>
    <li> Ter o Node instalado na versão LTS </li>
    <li> Ter o Docker com o docker-compose </li>
    <li> Ter o .env do projeto </li>
    <li> Ter um emulador ou um celular para vizualizar </li>
  </ul>
  
  <p>Front-end:</p>
  <ul>
    <li> Na raíz do projeto: cd mobile </li>
    <li> yarn ou npm install </li>
    <li> yarn start </li>
    <li> Scannear o QR Code com o app do Expo no Android, ou com a câmera normal no iOS (tendo o app instalado) </li>
    <li> Caso tenha o XCode ou o Android Studio: yarn ios ou yarn android, respectivamente. </li>
  </ul>
  
  <p>Back-end:</p>
  <ul>
    <li> Colocar o .env na raíz da pasta server </li>
    <li> Na raíz do projeto (a mesma que tem o arquivo docker-compose.yml), rodar docker compose up </li>
    <li> O servidor irá iniciar em http://localhost:3333 e a interface do Prisma Studio em http://localhost:5555 </li>
  </ul>
  
</section>

<section id="autores">
  <h1> Autores </h1>
  
  <table>
    <tr>
      <td valign="top">
        <a href="http://github.com/anaaroch">
          <img align="center" src="http://github.com/anaaroch.png" height="100" />
          <p align="center"> Ana Rocha </p>
        </a>
      </td>
      <td valign="top">
        <a href="http://github.com/brunomed">
          <img align="center" src="http://github.com/brunomed.png" height="100" />
          <p align="center"> Bruno Medeiros </p>
        </a>
      </td>
      <td valign="top">
        <a href="http://github.com/gustavohenriquers">
          <img align="center" src="http://github.com/gustavohenriquers.png" height="100" />
          <p align="center"> Gustavo Henrique </p>
        </a>
      </td>
      <td valign="top">
        <a href="http://github.com/gustavokenzo1">
          <img align="center" src="http://github.com/gustavokenzo1.png" height="100" />
          <p align="center"> Gustavo Kenzo </p>
        </a>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <a href="http://github.com/lelamo2002">
          <img align="center" src="http://github.com/lelamo2002.png" height="100" />
          <p align="center"> Leonardo Lago </p>
        </a>
      </td>
      <td valign="top">
        <a href="http://github.com/typejulio">
          <img align="center" src="http://github.com/typejulio.png" height="100" />
          <p align="center"> Júlio </p>
        </a>
      </td>
      <td valign="top">
        <a href="http://github.com/samuelricardods">
          <img align="center" src="http://github.com/samuelricardods.png" height="100" />
          <p align="center"> Samuel Ricardo </p>
        </a>
      </td>
    </tr>
  </table>
</section>
