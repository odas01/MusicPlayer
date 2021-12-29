const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'ODAS_PLAYER';

const player = $('.player');
const playList = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const progress = $('#progress');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isMouseUp: false,
    isRandom: false,
    isRepeat: false,
    isExist: [0],
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'Một bước yêu vạn dặm đau',
            singer: 'Mr Siro',
            path: './music/Mot Buoc Yeu Van Dam Dau - Mr Siro.mp3',
            image: './img/1buocyeu.jpg',
        },
        {
            name: 'Càng níu giữ càng dễ mất',
            singer: 'Mr Siro',
            path: './music/Cang Niu Giu Cang De Mat - Mr Siro.mp3',
            image: './img/cangniugiu.jpg',
        },
        {
            name: 'Lắng nghe nước mắt',
            singer: 'Mr Siro',
            path: './music/Lang Nghe Nuoc Mat - Mr Siro.mp3',
            image: './img/langnghe.jpg',
        },
        {
            name: 'Tình yêu chấp vá',
            singer: 'Mr Siro',
            path: './music/TinhYeuChapVa MrSiro.mp3',
            image: './img/tinhyeu.jpg',
        },
        {
            name: 'Càng níu giữ càng dễ mất',
            singer: 'Mr Siro',
            path: './music/Cang Niu Giu Cang De Mat - Mr Siro.mp3',
            image: './img/cangniugiu.jpg',
        },
        {
            name: 'Lắng nghe nước mắt',
            singer: 'Mr Siro',
            path: './music/Lang Nghe Nuoc Mat - Mr Siro.mp3',
            image: './img/langnghe.jpg',
        },
        {
            name: 'Tình yêu chấp vá',
            singer: 'Mr Siro',
            path: './music/TinhYeuChapVa MrSiro.mp3',
            image: './img/tinhyeu.jpg',
        },
        {
            name: 'Bước Qua Nhau',
            singer: 'Vũ',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688',
            image: 'https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg',
        },
        {
            name: 'Ái Nộ',
            singer: 'Masew, Khôi Vũ',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705',
            image: 'https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg',
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546',
            image: 'https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg',
        },
        {
            name: 'Thức Giấc',
            singer: 'Da LAB',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708',
            image: 'https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg',
        },
        {
            name: 'Độ Tộc 2',
            singer: 'Masew, Độ Mixi, Phúc Du, Pháo',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785',
            image: 'https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg',
        },
        {
            name: 'Chúng Ta Sau Này',
            singer: 'T.R.I',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875',
            image: 'https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg',
        },
        {
            name: 'Dịu Dàng Em Đến',
            singer: 'ERIK, NinjaZ',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938',
            image: 'https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg',
        },
        {
            name: 'Hương',
            singer: 'Văn Mai Hương, Negav',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027',
            image: 'https://avatar-nct.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757.jpg',
        },
        {
            name: 'Miên Man',
            singer: 'DUTZUX',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090',
            image: 'https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637320885751.jpg',
        },
        {
            name: 'Có hẹn với thanh xuân',
            singer: 'MONSTAR',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161',
            image: 'https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg',
        },
        {
            name: 'Stay',
            singer: 'The Kid LAROI, Justin Bieber',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=tDMLXwH5rcrkO9nF-Y0mWA&e=1638769802',
            image: 'https://avatar-nct.nixcdn.com/song/2021/07/09/5/5/8/2/1625815274622.jpg',
        },
        {
            name: 'All Too Well',
            singer: 'Taylor Swift',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/AllTooWell10MinuteVersionTaylorsVersion-TaylorSwift-7120438.mp3?st=moySlM-gRk8kpSEQdA729g&e=1638673508',
            image: 'https://avatar-nct.nixcdn.com/song/2021/11/23/d/a/a/e/1637643196932_300.jpg',
        },
        {
            name: 'Equal In The Darkness',
            singer: 'Steve Aoki, Thái Y Lâm (Jolin Tsai), MAX',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/EqualInTheDarkness-SteveAokiThaiYLamJolinTsaiMAX-7116228.mp3?st=1TO5aq2W9pnBPnKJ-0BwLA&e=1638673651',
            image: 'https://avatar-nct.nixcdn.com/song/2021/10/27/0/c/c/3/1635299658476_300.jpg',
        },
        {
            name: 'Always Love You',
            singer: 'Elton John, Young Thug, Nicki Minaj',
            path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio203/AlwaysLoveYou-EltonJohnYoungThugNickiMinaj-7114807.mp3?st=FjWol1PzZ4cmEPzH-8rKdQ&e=1638673737',
            image: 'https://avatar-nct.nixcdn.com/song/2021/10/21/c/d/d/a/1634797395961.jpg',
        },
        {
            name: "Wildest Dreams (Taylor's Version)",
            singer: 'Taylor Swift',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1022/WildestDreamsTaylorsVersion-TaylorSwift-7090980.mp3?st=MqTkbQYsSI-Wri68OiCggA&e=1638673817',
            image: 'https://avatar-nct.nixcdn.com/song/2021/09/17/5/a/b/4/1631889063619_300.jpg',
        },
        {
            name: 'Lonely',
            singer: 'Justin Bieber, Benny Blanco',
            path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio197/Lonely-JustinBieberbennyblanco-6993497.mp3?st=HfdveKXgMQiQEl5_nrafHg&e=1638784621',
            image: 'https://avatar-nct.nixcdn.com/song/2020/10/16/7/4/6/2/1602823109092.jpg',
        },
        {
            name: 'Intentions',
            singer: 'Justin Bieber, Quavo',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui995/Intentions-JustinBieberQuavo-6217997.mp3?st=hcdpQpM3beevQ-_6KJ82dA&e=1638784782',
            image: 'https://avatar-nct.nixcdn.com/song/2020/02/07/2/0/7/2/1581052824234.jpg',
        },
        {
            name: 'Hold On',
            singer: 'Justin Bieber, Dominic Fike',
            path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio201/HoldOn-JustinBieber-7103059.mp3?st=Jb7CePADDk5Lz9NMD9pSAQ&e=1638784678',
            image: 'https://avatar-nct.nixcdn.com/song/2021/03/05/2/1/7/c/1614931554567.jpg',
        },
        {
            name: 'Monster',
            singer: 'Shawn Mendes, Justin Bieber',
            path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio188/Monster-ShawnMendesJustinBieber-6838261.mp3?st=w65iy6S0b1mtDlUnsZOceA&e=1638784732',
            image: 'https://avatar-nct.nixcdn.com/song/2020/11/23/0/2/3/c/1606100084558.jpg',
        },
        {
            name: 'All Around Me',
            singer: 'Justin Bieber',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui995/AllAroundMe-JustinBieber-6223828.mp3?st=vvGCbil4vC_5l_05XNgOtw&e=1638873647',
            image: 'https://avatar-nct.nixcdn.com/song/2020/02/14/a/9/d/b/1581658518670.jpg',
        },
        {
            name: 'Haru Haru',
            singer: 'BIGBANG',
            path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/HaruHaru-BIGBANG-6291516.mp3?st=Gspt0qSx7rVZoYeM-x2jXA&e=1638783344',
            image: 'https://avatar-nct.nixcdn.com/song/2020/06/09/2/d/0/7/1591688793624.jpg',
        },
        {
            name: 'Mang Chủng / 芒种',
            singer: 'Âm Khuyết Thi Thính, Triệu Phương Tịnh (Zhao Fangjing)',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui983/MangChung-TrieuPhuongTinhAmKhuyetThiThinh-5989054.mp3?st=9WINGtCn0ciu3GtGJODdrQ&e=1638784935',
            image: 'https://avatar-nct.nixcdn.com/song/2019/08/05/1/9/9/6/1565016156395.jpg',
        },
        {
            name: 'Phi Điểu Và Ve Sầu / 飞鸟和蝉',
            singer: 'Nhậm Nhiên',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1000/ChimBayCungVe-NhamNhien-6321767.mp3?st=OPJVhLrpz3u1cVbknHRjzw&e=1638784935',
            image: 'https://avatar-nct.nixcdn.com/song/2020/07/03/8/9/c/9/1593752079734.jpg',
        },
        {
            name: 'Sứ Thanh Hoa / 青花瓷',
            singer: 'Châu Kiệt Luân (Jay Chou)',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui964/SuThanhHoa-ChauKietLuanJayChou-108110.mp3?st=ieBMFvjQWp7apqOrblPsiQ&e=1638784935',
            image: 'https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565165369019.jpg',
        },
        {
            name: 'Đồng Thoại',
            singer: 'Quang Lương (Michael Wong)',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui946/DongThoai-MichaelWongQuangLuong-161624.mp3?st=lVaJblR1dnRj2csOFwvkRA&e=1638784935',
            image: 'https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565163727207.jpg',
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${
                    index === this.currentIndex ? 'active' : ''
                }" data-index=${index}>
                    <div
                        class="thumb"
                        style="
                            background-image: url('${song.image}');
                        "
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        playList.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        const st = Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;

        //Xử lí CD quay và dừng
        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: 'rotate(360deg)',
                },
            ],
            {
                duration: 10000, //10 giây
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        //Xử lí phóng to thu nhỏ CD
        document.onscroll = function () {
            const scroolTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - parseInt(scroolTop);

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        //Xử lí khi click Play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        //Khi bài hát dc Play
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        //Khi bài hát bị Pause
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };

        //Khi tiến độ bài hát bị thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent =
                    (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercent;
            }
        };

        //Khi tua bài hát
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
            audio.pause();
            progress.onmouseup = function (e) {
                audio.play();
            };
        };

        //Khi chọn bài kế tiếp (next)
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.nextSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        };

        //Khi quay về bài hát trước
        prevBtn.onclick = function () {
            app.prevSong();
            audio.play();
            app.render();
            app.scrollToActiveSong();
        };

        //Khi bật/tắt random
        randomBtn.onclick = function (e) {
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom', app.isRandom);
            this.classList.toggle('active', this.isRandom);
        };

        //Xử lí khi phát lại bài hát
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            app.setConfig('isRepeat', app.isRepeat);
            this.classList.toggle('active', this.isRepeat);
        };

        //Xử lí qua bài mới khi hết bài
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        //Lắng nghe click vào play list
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (!e.target.closest('.option')) {
                //Xử lí khi click vào bài hát
                if (songNode) {
                    app.currentIndex = parseInt(songNode.dataset.index);
                    app.loadCurrentSong();
                    app.render();
                    audio.play();
                }
            }
            app.saveCurrentSong();
        };
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style = `background-image: url('${this.currentSong.image}');`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function () {
        if (!localStorage.length) {
            this.isRandom = false;
            this.isRepeat = false;
            this.currentIndex = 0;
        } else {
            this.isRandom = this.config.isRandom;
            this.isRepeat = this.config.isRepeat;
            this.currentIndex = this.config.currentSong
                ? this.config.currentSong.index
                : 0;
        }
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (
            newIndex === this.currentIndex ||
            app.isExist.includes(newIndex)
        );
        this.currentIndex = newIndex;
        this.isExist.push(newIndex);
        let arrEnd = new Set(this.isExist);
        if (arrEnd.size === this.songs.length) {
            this.isExist.splice(0, this.songs.length - 1);
        }
        this.loadCurrentSong();
    },
    saveCurrentSong: function () {
        this.songs[this.currentIndex].index = this.currentIndex;
        app.setConfig('currentSong', this.songs[this.currentIndex]);
    },
    scrollToActiveSong: function () {
        if (app.currentIndex === 0 || app.currentIndex === 1) {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        } else {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    },
    start: function () {
        //Gán cấu hình từ config vào object app
        this.loadConfig();

        //Định nghĩa các thuộc tính cho object
        this.defineProperties();

        //Lắng nghe và xử lí các sự kiện
        this.handleEvents();

        //Tải bài hát đầu tiên vào UI khi vào app
        this.loadCurrentSong();

        //Render ra danh sách bài hát(playlist)
        this.render();

        //Hiển thị tráng thái ban đầu của button repeat và random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    },
};
app.start();
