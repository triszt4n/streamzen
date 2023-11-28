import "./App.css";
import VideoProto from "./components/VideoProto";

function App() {
  return (
    <>
      <div>Hello there</div>
      <VideoProto src="http://localhost:3000/stream/title/output.m3u8" />
    </>
  );
}

export default App;
