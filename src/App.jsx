import React, { useState, useEffect } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  useEffect(() => {
    // Load playlist from local storage on initial render
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (storedPlaylist) {
      setPlaylist(storedPlaylist);
    }

    // Load last playing track index from local storage on initial render
    const storedTrackIndex = localStorage.getItem('currentTrackIndex');
    if (storedTrackIndex !== null) {
      setCurrentTrackIndex(parseInt(storedTrackIndex));
    }
  }, []);

  useEffect(() => {
    // Save playlist to local storage whenever it changes
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    // Save current track index to local storage whenever it changes
    localStorage.setItem('currentTrackIndex', currentTrackIndex);
  }, [currentTrackIndex]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Add the new file to the playlist
    const newPlaylist = [...playlist, file];
    setPlaylist(newPlaylist);

    // If no track is currently playing, start playing the new track
    if (currentTrackIndex === -1) {
      setCurrentTrackIndex(newPlaylist.length - 1);
    }
  };

  const handlePlay = (index) => {
    // Update the current track index to play the selected track
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    // Handle the end of the current track: move to the next track or reset if at the end
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(-1); // Reset to beginning of playlist
    }
  };

  return (
            <div className='bg-site bg-cover'>
                <div className='gap-x-2 gap-y-8 h-screen flex flex-col md:flex-row md:flex justify-center items-center'>
                        <div className='flex justify-center items-center h-[250px] w-[300px] md:h-[320px] md:w-[320px] lg:h-[480px] lg:w-[480px] rounded-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b-2 border-gray-100'>
                          <div className='flex justify-center items-center rounded-full lg:h-[300px] lg:w-[300px] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-70 border border-gray-100'>
                            <div className=''>
                               <input className='btn text-[8px]  lg:text-[16px]' type="file" accept="audio/mp3" onChange={handleFileChange} />
                            </div>
                          </div>
                        </div>  
            
                    <div className='overflow-y-scroll no-scrollbar flex flex-col items-center h-[250px] w-[300px] md:h-[320px] md:w-[320px] lg:h-[480px] lg:w-[480px] rounded-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b-2 border-gray-100'>  
                    <h3 className=' text-gradient text-center mt-8 mb-8 font-secondary border-b-2 w-[100px] rounded-2xl hover:backdrop-blur-sm cursor-pointer'>PLAYLIST</h3>
                      <ul>
                        {playlist.map((track, index) => (
                          <li key={index}>
                            <button className='btn px-2 mb-2 h-[32px]' onClick={() => handlePlay(index)}>{track.name.slice(0, 44)}</button>
                          </li>
                        ))}
                      </ul>
                      <hr />
                    </div>
                </div>
                  
            {currentTrackIndex !== -1 && (
                  <div className='flex justify-center items-center'>
                    <div className='lg:fixed lg:bottom-14 flex justify-center items-center h-[180px] w-[480px] rounded-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>  
                          <div className='flex flex-col justify-center items-center'>
                            <h2 className='text-center mb-4 font-secondary border-b-2 w-[200px] rounded-2xl'>NOW PLAYING</h2>
                            <audio
                              controls
                              onEnded={handleEnded}
                              src={URL.createObjectURL(playlist[currentTrackIndex])}
                            />
                          </div>
                    </div>
                  </div>
                  )}
                 
            </div>
  );
}

export default App;