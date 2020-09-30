/**
  * This function formats the name from last name, first name to firstName lastName
  * @param { string } name - the name to format
 * @ return { string } newFormatName - the new formatted name;
  */
export default function formatName (name: string):string {

  const newName = name.split(', ');
  const newFormatName = `${newName[1]} ${newName[0]}`

  return newFormatName;
}