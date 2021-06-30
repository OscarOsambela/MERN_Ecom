import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../Actions/userAction';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { USER_DETAILS_RESET } from '../Constants/userConstant';

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('¿Está seguro de eliminar?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Usuarios</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Usuario eliminado exitosamente</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>VENDEDOR?</th>
              <th>ADMINISTRADOR?</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'SI' : ' NO'}</td>
                <td>{user.isAdmin ? 'SI' : 'NO'}</td>
                <td>
                <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}