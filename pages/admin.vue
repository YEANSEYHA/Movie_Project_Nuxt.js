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
          @click.prevent="editMovie(record)"
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
    <a-modal v-model="visible" title="Title">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleEdit"
          >Submit</a-button
        >
      </template>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Title"
          name="title"
          :rules="[{ required: true, message: 'Please input your title!' }]"
        >
          <a-input v-model="movie.title" />
        </a-form-item>
        <a-form-item
          label="Genre"
          name="genre"
          :rules="[{ required: true, message: 'Please input your genre!' }]"
        >
          <a-input v-model="movie.genre" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      movie: {},
      visible: false,
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
    async handleEdit() {
      console.log(this.movie);
      try {
        const data = {
          title: this.movie.title,
          genre: this.movie.genre,
        };
        await this.$store.dispatch("movie/updateMovie", {
          movieId: this.movie._id,
          data: data,
        });
        this.visible = false;
      } catch (error) {
        const errorMessage = error.message;
        throw new Error(errorMessage);
      }
    },
    handleCancel() {
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    async editMovie(data) {
      this.visible = true;
      this.movie = data;
      /* console.log("Show me now", data); */
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
