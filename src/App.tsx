import { ExampleLayout } from './components/ExampleLayout'
import { CodeBlock } from './components/CodeBlock'

function App() {
  const left = (
    <CodeBlock>
      <div>{`function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}
          `}</div>
    </CodeBlock>
  )

  const right = (
    <div>right</div>
  )

  return (
    <div>
      <ExampleLayout filename='index.js' left={left} right={right} />
    </div>
  )
}

export default App
