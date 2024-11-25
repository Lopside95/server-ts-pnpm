import { Knex } from "knex";
import knex from "../../knexfile.ts";

const createPostsTable = async () => {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("img");
    table.string("description");
    table.string("longitude");
    table.string("latitude");
    table.integer("urgency").notNullable();
    table.enu("type", ["GENERAL", "REPORT"]).notNullable();
    table.enu("status", ["OPEN", "CLOSED"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

const up = async () => {
  try {
    await createPostsTable();
    console.log("Posts table created successfuly");
  } catch (error) {
    console.error(error);
  }
};

up();
