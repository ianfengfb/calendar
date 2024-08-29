<template>
    <div class="no-diary" v-if="data == null">No diary found</div>
    <div class="d-flex flex-column justify-space-between h-100" v-else>
        <div>
            <div class="date mb-2">
                {{ data.date }}
            </div>
            <div class="rating mb-3">
                <v-icon v-for="n in data.mood" :key="n" icon="mdi-emoticon-wink" size="small"></v-icon>
            </div>
            <div class="mb-3"> 
                <div ref="note" class="note" :style="{height: readMore ? 'auto' : '3rem'}">{{ data.note }}</div>
                <p class="readMore" @click="toggleReadMore" :style="{cursor: showReadMore ? 'pointer' : 'auto'}">{{showReadMore ? readMoreText : ' '}}</p>
            </div>
            <div>
                <v-row v-if="data?.diary_images.length > 0">
                    <v-col
                        v-for="image in data.diary_images"
                        class="d-flex child-flex mb-3 p-1 cursor-pointer"
                        :key="image.id"
                        :cols="colValue"
                        @click="showImgUrl(image.image_cloud_url)"
                    >
                        <v-img
                            :src="image.image_thumbnail_url"
                            aspect-ratio="1"
                            class="bg-grey-lighten-2"
                        >
                            <template v-slot:placeholder>
                                <v-row
                                    align="center"
                                    class="fill-height ma-0"
                                    justify="center"
                                >
                                    <v-progress-circular
                                        color="grey-lighten-5"
                                        indeterminate
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12">
                        <v-img
                            src="https://res.cloudinary.com/dvmlczwti/image/upload/c_thumb,w_200,g_face/v1723850323/noimg_bq847l.png"
                            aspect-ratio="1"
                            class="bg-grey-lighten-2"
                        >
                            <template v-slot:placeholder>
                                <v-row
                                    align="center"
                                    class="fill-height ma-0"
                                    justify="center"
                                >
                                    <v-progress-circular
                                        color="grey-lighten-5"
                                        indeterminate
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div>
            <v-btn 
                rounded="lg" 
                block
                color="#e9e9e9"
                class="mt-3"
                :to="`/diaries/edit/${data.id}`"
            >Edit</v-btn>
        </div>
    </div>
    <v-dialog
      v-model="lightbox"
      width="auto"
    >
        <img
            :src="showImg"
            class="lightbox-img"
        />
    </v-dialog>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            return {
                readMore: false,
                noteExceedsHeight: false,
                showImg: null,
                lightbox: false
            }
        },
        computed: {
            colValue() {
                if (this.data.diary_images.length >= 3) {
                    return 4;
                } else if (this.data.diary_images.length == 2) {
                    return 6;
                }
                return 12;
            },
            readMoreText() {
                return this.readMore ? 'Read Less' : 'Read More';
            },
            showReadMore() {
                return this.noteExceedsHeight;
            },
        },
        methods: {
            toggleReadMore() {
                this.readMore = !this.readMore;
            },
            checkNoteHeight() {
                this.$nextTick(() => {
                    const noteElement = this.$refs.note;
                    if (!noteElement) return;
                    const originalHeight = noteElement.style.height;
                    noteElement.style.height = 'auto';
                    this.noteExceedsHeight = noteElement.scrollHeight > 48; // 3rem in pixels
                    noteElement.style.height = originalHeight;
                });
            },
            showImgUrl(url) {
                this.showImg = url;
                this.lightbox = true;
            }
        },
        mounted() {
            this.checkNoteHeight();
        },
        updated() {
            this.checkNoteHeight();
        }
    }
</script>

<style>
    .date {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .note {
        overflow: hidden;
        min-height: 3rem;
    }

    .readMore {
        text-align: end;
        color: #7d7b7b;
        min-height: 1.5rem;
    }

    .lightbox-img {
        height: 80vh;
        object-fit: contain;
    }

    .no-diary {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 40vh;
    }
</style>