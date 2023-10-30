import "./App.css";
import VideoProto from "./components/VideoProto";

function App() {
  return (
    <>
      <div>Hello there</div>
      <VideoProto src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </>
  );
}

export default App;
