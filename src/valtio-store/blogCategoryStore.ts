import { proxy } from "valtio";

interface RootState {
  blogCategoryId: number;
}

export const blogCategoryStore = proxy<RootState>({
  blogCategoryId: 0,
});
