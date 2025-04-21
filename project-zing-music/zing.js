const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const modal = document.getElementById("song-options-modal");
const closeModal = document.getElementById("close-modal");
let selectedSongId = null;
const favoritesModal = document.getElementById("favorites-modal");
const closeFavoritesModal = document.getElementById("close-favorites-modal");
const favoritesList = document.getElementById("favorites-list");


const allSongs = [
  {
    id: 0,
    title: "Tomorrow - No Lead Vocals",
    artist: "David Feldman",
    duration: "2:33",
    pathImage:
      "https://artlist-albums.imgix.net/images/12235_956270_956270_ZISO_-_Thank_God_You_Left_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/David Feldman - Tomorrow - No Lead Vocals.mp3",
  },
  {
    id: 1,
    title: "Think About You",
    artist: "NM",
    duration: "1:56",
    pathImage:
      "https://artlist-albums.imgix.net/images/12215_955462_955462_Danny_Shields_-_Cybernetic_Reflection_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/NM - Thinking About You.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Roie Shpigler , Nono",
    duration: "3:51",
    pathImage:
      "https://artlist-albums.imgix.net/images/962525_Romeo_-_Valley_of_Lights_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/AlexGrohl - Papercut.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Barrel",
    duration: "3:34",
    pathImage:
      "https://artlist-albums.imgix.net/images/12235_956270_956270_ZISO_-_Thank_God_You_Left_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/NM - I Need You.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "SPACETRAIN UNITED",
    duration: "3:35",
    pathImage:
      "https://artlist-albums.imgix.net/images/968161_Loya_-_Safe_Space_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/Notize - Burn for You.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "idokay",
    duration: "3:12",
    pathImage:
      "https://artlist-albums.imgix.net/images/11859_947599_947599_MooveKa_-_Boogie_Breakin-_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/Out of Flux - happicat.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Ziv Moran",
    duration: "3:25",
    pathImage:
      "https://artlist-albums.imgix.net/images/11907_947728_947728_Elijah_Aaron_-_Where_We_Go_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/Semo - A Furry Affair.mp3",
  },
  {
    id: 7,
    title: "Takin'a Walk",
    artist: "Quincy Larson",
    duration: "3:52",
    pathImage:
      "https://artlist-albums.imgix.net/images/11907_947728_947728_Elijah_Aaron_-_Where_We_Go_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/Semo - The Microwave Dance.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Romeo",
    duration: "3:10",
    pathImage:
      "https://artlist-albums.imgix.net/images/11934_947884_947884_Ariel_Shalom_-_I_GOT_MYSELF_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./assets/NM - Thinking About You.mp3",
  },
  {
    id: 9,
    title: "Ashes",
    artist: "Danny Shields",
    duration: "2:43",
    pathImage:
      "https://artlist-albums.imgix.net/images/11741_937830_937830_All_My_Life.png_-_A_-_500X500.png?auto=format&fit=max&w=64&q=75",
    src: "./assets/Damon Power - Cosmic Pulse.mp3",
  },
  {
    id: 10,
    title: "Ashes",
    artist: "Danny Shields",
    duration: "2:43",
    pathImage:
      "https://artlist-albums.imgix.net/images/11741_937830_937830_All_My_Life.png_-_A_-_500X500.png?auto=format&fit=max&w=64&q=75",
    src: "./assets/Damon Power - Cosmic Pulse.mp3",
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
  favorites: [],
  otherPlaylist: [],
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  playButton.style.display = "none";
  pauseButton.style.display = "inline";
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  pauseButton.style.display = "none";
  playButton.style.display = "inline";
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();

  const firstShuffledSong = userData.songs[0];
  if (firstShuffledSong) {
    playSong(firstShuffledSong.id);
  }
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <img style="width: 50px" src="${song.pathImage}"/>
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <div style="display: flex; flex-direction: column;
    align-items: baseline;" class="playlist-span">
           <span class="playlist-song-title">${song.title}</span>
           <span class="playlist-song-artist">${song.artist}</span>
        </div>    
           <span class="playlist-song-duration">${song.duration}</span>
      </button>
       <span class="song-options-icon" onclick="openSongOptionsModal(${song.id}, event)">⋯</span>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

const openSongOptionsModal = (id, event) => {
  event.stopPropagation(); // Ngăn việc click lan sang playSong
  selectedSongId = id;
  modal.style.display = "block";
};

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
const renderFavorites = () => {
  if (userData.favorites.length === 0) {
    favoritesList.innerHTML = "<li>Chưa có bài hát nào trong danh sách yêu thích.</li>";
    return;
  }

  const listItems = userData.favorites
    .map(
      (song) => `
      <li style="margin-bottom: 10px; margin-top: 10px">
        <img src="${song.pathImage}" style="width: 40px; vertical-align: middle; margin-right: 8px;" />
        <strong>${song.title}</strong> – <em>${song.artist}</em>
      </li>`
    )
    .join("");

  favoritesList.innerHTML = listItems;
};

const addToFavorites = () => {
  const song = userData.songs.find((s) => s.id === selectedSongId);

  if (!song) {
    alert("Không tìm thấy bài hát.");
    return;
  }

  const isAlreadyFavorite = userData.favorites.some((s) => s.id === song.id);

  if (isAlreadyFavorite) {
    alert(`🎧 "${song.title}" đã có trong yêu thích!`);
    return;
  }

  userData.favorites.push(song);
  alert(`❤️ Đã thêm "${song.title}" vào danh sách yêu thích!`);

  renderFavorites(); // Gọi hàm để cập nhật giao diện nếu có
};

const addToPlaylist = () => {
  const song = userData.songs.find((s) => s.id === selectedSongId);

  if (!song) {
      alert("Không tìm thấy bài hát.");
      return;
  }

  const playlistName = prompt("Nhập tên playlist để thêm bài hát:");

  if (!playlistName) {
      alert("Tên playlist không hợp lệ.");
      return;
  }

  if (!userData.playlists) {
      userData.playlists = {};
  }

  if (!userData.playlists[playlistName]) {
      userData.playlists[playlistName] = [];
  }

  userData.playlists[playlistName].push(song);
  
  alert(`🎶 Đã thêm "${song.title}" vào playlist "${playlistName}"!`);
  
  renderSongs();
};

const downloadSong = () => {
  const song = userData.songs.find(s => s.id === selectedSongId);
  if (song) {
    const link = document.createElement("a");
    link.href = song.src;
    link.download = song.title;
    link.click();
  }
};

const shareSong = () => {
  alert(`Chia sẻ link của bài hát ID: ${selectedSongId}`);
};

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

document.getElementById("open-favorites").addEventListener("click", () => {
  renderFavorites();
  favoritesModal.style.display = "block";
});
closeFavoritesModal.addEventListener("click", () => {
  favoritesModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === favoritesModal) {
    favoritesModal.style.display = "none";
  }
});
pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
  }
});

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());
setPlayButtonAccessibleText();
/* 
 <button  style="border: none;"  onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
*/
