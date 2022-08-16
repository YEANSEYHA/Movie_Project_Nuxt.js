<template>
  <div>
    <h1>CRUD movie here</h1>
    <a-table
      :dataSource="movies"
      :columns="columns"
      :row-key="(record) => record._id"
    >
      <template slot="action" slot-scope="text, record">
        <button
          type="button"
          class="btn btn-danger w-16 mr-1 mb-2"
          @click.prevent="popupModal(record._id)"
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-danger w-16 mr-1 mb-2"
          @click.prevent="deleteMovie(record._id)"
        >
          Delete
        </button>
      </template></a-table
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          title: "Title",
          dataIndex: "title",
          key: "name",
        },
        {
          title: "Genre",
          dataIndex: "genre",
          key: "genre",
        },
        {
          title: "Actions",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  async asyncData({ store }) {
    try {
      await store.dispatch("movie/fetchAllMovie");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  },
  computed: {
    ...mapGetters({
      movies: "movie/getMovies",
    }),
  },
  methods: {
    popupModal(data) {
      console.log("Show me now", data);
    },
    async deleteMovie(id) {
      try {
        await this.$store.dispatch("movie/deleteMovie", {
          movieId: id,
        });
      } catch (error) {
        const errorMessage = error.message;
        throw new Error(errorMessage);
      }
    },
  },
};
</script>

<style></style>
