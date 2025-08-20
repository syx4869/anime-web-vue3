// src/stores/anime.js
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'

// 1️⃣ 热门动漫（不传 search）
export const GET_POPULAR = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { hasNextPage }
      media(type: ANIME, sort: [POPULARITY_DESC]) {
        id
        title { romaji }
        coverImage { large }
        episodes
        genres
        description
      }
    }
  }
`

// 2️⃣ 搜索动漫（带 search）
export const GET_ANIME_LIST = gql`
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { hasNextPage }
      media(search: $search, type: ANIME) {
        id
        title { romaji }
        coverImage { large }
        episodes
        genres
        description
      }
    }
  }
`

export const useAnimeStore = defineStore('anime', {
  state: () => ({
    list: [],
    hasNextPage: true,
    page: 1,
    search: '',
    loading: false
  }),
  actions: {
    async fetchMore(apollo) {
      this.loading = true
      try {
        // 根据是否有搜索词决定用哪个查询
        const query = this.search ? GET_ANIME_LIST : GET_POPULAR
        const variables = this.search
          ? { page: this.page, perPage: 20, search: this.search }
          : { page: this.page, perPage: 20 }

        const { data } = await apollo.query({ query, variables })
        this.list.push(...data.Page.media)
        this.hasNextPage = data.Page.pageInfo.hasNextPage
        this.page += 1
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.list = []
      this.page = 1
      this.hasNextPage = true
    }
  }
})