# About

This is an example repo showing how to use Irys to upload multiple files with a single wallet interaction.

> Most users will not need this code as it's much easier to use [`irys.uploadFolder()`](https://docs.irys.xyz/developer-docs/irys-sdk/api/uploadFolder) instead.

The code:

-   Creates an array of all files
-   Creates an array with length equal to number of files to hold tags, each entry in the array is a sub-array of tags (for demo purposes the sub-arrays just hold 1 tag, but this could be easily modified)
-   Manually creates a nested bundle and uploads all files with their assocaited tags

Tags attached to files in a nested bundle are not currently indexed and can not be used as search parameters when using the query package or GraphQL.

The values can be manually discovered using a URL in the format https://devnet.irys.xyz/tx/[tx-id]

Example:
https://devnet.irys.xyz/tx/uIWJ2C3_eC2ynp6bnYRAKe7Gc9zfZfwxeY-73OkdkCc
