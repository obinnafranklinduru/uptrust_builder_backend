import { IAddressModel } from "../models/interfaces/address.interface";
import AddressModel from "../models/address.model";
import { AddressInput, UpdateAddressInput } from "../models/dto/address.dto";

export class AddressRepository {
  async addAddress({
    userId,
    addressLine1,
    addressLine2,
    city,
    postCode,
    country,
  }: AddressInput): Promise<IAddressModel> {
    const result = await AddressModel.find({ user_id: userId });
    if (result.length >= 1) throw new Error("You have added address already");
    return (await AddressModel.create({
      user_id: userId,
      address_line1: addressLine1,
      address_line2: addressLine2,
      city,
      post_code: postCode,
      country,
    })) as IAddressModel;
  }

  async findAddress(userId: string): Promise<IAddressModel> {
    return (await AddressModel.findOne({ user_id: userId }).select(
      "-__v -_id -user_id"
    )) as IAddressModel;
  }

  async updateAddress({
    userId,
    addressLine1,
    addressLine2,
    city,
    postCode,
    country,
  }: UpdateAddressInput): Promise<IAddressModel> {
    return (await AddressModel.findOneAndUpdate(
      { user_id: userId },
      {
        address_line1: addressLine1,
        address_line2: addressLine2,
        city,
        post_code: postCode,
        country,
      },
      { upsert: false, new: true }
    )) as IAddressModel;
  }

  async deleteddress(userId: string) {
    return await AddressModel.deleteOne({ user_id: userId });
  }
}
