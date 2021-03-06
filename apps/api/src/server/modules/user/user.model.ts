import { CoreUserModel } from '@lenne.tech/nest-server';
import { Field, ObjectType } from '@nestjs/graphql';
import { PersistenceModel } from '../../common/models/persistence.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

/**
 * User model
 */
@Schema()
@ObjectType({ description: 'User' })
export class User extends CoreUserModel implements PersistenceModel {
  // ===================================================================================================================
  // Properties
  // ===================================================================================================================

  /**
   * URL to avatar file of the user
   */
  @Field({ description: 'URL to avatar file of the user', nullable: true })
  @Prop()
  avatar: string = undefined;

  /**
   * User who created the object
   *
   * Not set when created by system
   */
  @Field((type) => User, {
    description: 'ID of the user who created the object',
    nullable: true,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User = undefined;

  /**
   * User who last updated the object
   *
   * Not set when updated by system
   */
  @Field((type) => User, {
    description: 'ID of the user who last updated the object',
    nullable: true,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: User = undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);
